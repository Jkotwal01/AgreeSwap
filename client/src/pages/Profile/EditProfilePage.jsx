import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '../../contexts/AuthContext'
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone, FaGlobe, FaPen } from 'react-icons/fa'

const profileSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  location: Yup.string()
    .required('Location is required'),
  phone: Yup.string()
    .matches(/^[0-9+ -]*$/, 'Invalid phone number'),
  website: Yup.string()
    .url('Must be a valid URL')
    .nullable(),
  bio: Yup.string()
    .max(500, 'Bio must be less than 500 characters')
})

export default function EditProfilePage() {
  const { user, updateProfile } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setIsSubmitting(true)
      setError('')

      // Format the data before sending
      const formattedData = {
        ...values,
        // Remove empty strings and convert them to null
        phone: values.phone || null,
        website: values.website || null,
        bio: values.bio || null
      }

      // Send update request
      await updateProfile(formattedData)

      setSuccess('Profile updated successfully')
      
      // Navigate back to profile after short delay
      setTimeout(() => {
        navigate('/profile')
      }, 2000)
    } catch (err) {
      console.error('Profile update error:', err)
      setError(err.message || 'Failed to update profile')
    } finally {
      setIsSubmitting(false)
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <FaPen className="mr-2 text-green-600" />
            Edit Profile
          </h1>

          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
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
            <div className="mb-4 bg-green-50 border-l-4 border-green-400 p-4">
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
              name: user?.name || '',
              email: user?.email || '',
              location: user?.location || '',
              phone: user?.phone || '',
              website: user?.website || '',
              bio: user?.bio || ''
            }}
            validationSchema={profileSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      <FaUser className="inline mr-2" />
                      Full Name
                    </label>
                    <Field
                      name="name"
                      type="text"
                      className={`mt-1 block w-full rounded-md shadow-sm ${
                        errors.name && touched.name
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-green-500'
                      }`}
                    />
                    {errors.name && touched.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      <FaEnvelope className="inline mr-2" />
                      Email Address
                    </label>
                    <Field
                      name="email"
                      type="email"
                      className={`mt-1 block w-full rounded-md shadow-sm ${
                        errors.email && touched.email
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-green-500'
                      }`}
                    />
                    {errors.email && touched.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      <FaMapMarkerAlt className="inline mr-2" />
                      Location
                    </label>
                    <Field
                      name="location"
                      type="text"
                      className={`mt-1 block w-full rounded-md shadow-sm ${
                        errors.location && touched.location
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-green-500'
                      }`}
                    />
                    {errors.location && touched.location && (
                      <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      <FaPhone className="inline mr-2" />
                      Phone Number (optional)
                    </label>
                    <Field
                      name="phone"
                      type="text"
                      className={`mt-1 block w-full rounded-md shadow-sm ${
                        errors.phone && touched.phone
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-green-500'
                      }`}
                    />
                    {errors.phone && touched.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      <FaGlobe className="inline mr-2" />
                      Website (optional)
                    </label>
                    <Field
                      name="website"
                      type="url"
                      className={`mt-1 block w-full rounded-md shadow-sm ${
                        errors.website && touched.website
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-green-500'
                      }`}
                    />
                    {errors.website && touched.website && (
                      <p className="mt-1 text-sm text-red-600">{errors.website}</p>
                    )}
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Bio (optional)
                    </label>
                    <Field
                      name="bio"
                      as="textarea"
                      rows={4}
                      className={`mt-1 block w-full rounded-md shadow-sm ${
                        errors.bio && touched.bio
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-green-500'
                      }`}
                    />
                    {errors.bio && touched.bio && (
                      <p className="mt-1 text-sm text-red-600">{errors.bio}</p>
                    )}
                    <p className="mt-1 text-sm text-gray-500">
                      Brief description about yourself and your gardening interests.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => navigate('/profile')}
                    className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-2 rounded-md text-white ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}