import axios from 'axios'
import { useState } from 'react'

interface UseRequestProps {
  url: string
  method: 'post' | 'get' | 'patch' | 'put'
  body: Record<string, any>
  onSuccess: (data?: any) => void
}

export default ({ url, method, body, onSuccess }: UseRequestProps) => {
  const [errors, setErrors] = useState<null | React.ReactNode>(null)

  const doRequest = async (props: any = {}) => {
    try {
      setErrors(null)
      const response = await axios[method](url, { ...body, ...props })

      if (onSuccess) {
        onSuccess(response.data)
      }

      return response.data
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrors(
          <div className="alert alert-danger">
            <h4>Ooops....</h4>
            <ul className="my-0">
              {/* @ts-ignore */}
              {err.response?.data.errors.map((err) => (
                <li key={err.message}>{err.message}</li>
              ))}
            </ul>
          </div>
        )
      }
    }
  }

  return { doRequest, errors }
}
