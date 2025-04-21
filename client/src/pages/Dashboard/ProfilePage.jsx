import { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '../../contexts/AuthContext'
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt } from 'react-icons/fa'

const profileSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  location: Yup.string()
    .required('Location is required'),
  currentPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters'),
  newPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters'),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
})

export default function ProfilePage() {
  const { currentUser, updateProfile } = useAuth()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await updateProfile({
        name: values.name,
        email: values.email,
        location: values.location,
        currentPassword: values.currentPassword,
        newPassword: values.newPassword
      })
      setSuccess('Profile updated successfully')
      setError('')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile')
      setSuccess('')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
            <p className="mt-1 text-sm text-gray-600">
              Update your personal information and password
            </p>
          </div>
        </div>

        <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {success && (
                <div className="bg-green-50 border-l-4 border-green-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-700">{success}</p>
                    </div>
                  </div>
                </div>
              )}

              <Formik
                initialValues={{
                  name: currentUser?.name || '',
                  email: currentUser?.email || '',
                  location: currentUser?.location || '',
                  currentPassword: '',
                  newPassword: '',
                  confirmNewPassword: ''
                }}
                validationSchema={profileSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form className="space-y-6">
                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <FaUser className="mr-2" />
                        Full Name
                      </label>
                      <Field
                        name="name"
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      />
                      {errors.name && touched.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <FaEnvelope className="mr-2" />
                        Email Address
                      </label>
                      <Field
                        name="email"
                        type="email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      />
                      {errors.email && touched.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <FaMapMarkerAlt className="mr-2" />
                        Location
                      </label>
                      <Field
                        name="location"
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      />
                      {errors.location && touched.location && (
                        <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                      )}
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="text-sm font-medium text-gray-900">Change Password</h4>
                      
                      <div className="mt-4">
                        <label className="flex items-center text-sm font-medium text-gray-700">
                          <FaLock className="mr-2" />
                          Current Password
                        </label>
                        <Field
                          name="currentPassword"
                          type="password"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        />
                        {errors.currentPassword && touched.currentPassword && (
                          <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>
                        )}
                      </div>

                      <div className="mt-4">
                        <label className="flex items-center text-sm font-medium text-gray-700">
                          <FaLock className="mr-2" />
                          New Password
                        </label>
                        <Field
                          name="newPassword"
                          type="password"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        />
                        {errors.newPassword && touched.newPassword && (
                          <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
                        )}
                      </div>

                      <div className="mt-4">
                        <label className="flex items-center text-sm font-medium text-gray-700">
                          <FaLock className="mr-2" />
                          Confirm New Password
                        </label>
                        <Field
                          name="confirmNewPassword"
                          type="password"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        />
                        {errors.confirmNewPassword && touched.confirmNewPassword && (
                          <p className="mt-1 text-sm text-red-600">{errors.confirmNewPassword}</p>
                        )}
                      </div>
                    </div>

                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Save Changes
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}