
'use server'

import { redirect } from 'next/navigation'

export async function loginDoctor(formData: FormData) {
  const username = formData.get('username')
  const password = formData.get('password')

  if (username === 'doctor' && password === 'admin123') {
    redirect('/doctor')
  } else {
    redirect('/auth/doctor?error=Invalid credentials')
  }
}

export async function loginPatient(formData: FormData) {
  // Mock patient login
  redirect('/patient')
}

export async function signupPatient(formData: FormData) {
  // Mock patient signup
  redirect('/patient')
}
