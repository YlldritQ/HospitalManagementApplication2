import { type Control, Controller } from "react-hook-form"

interface IProps {
  control: Control<any, any>
  label?: string
  inputName: string
  inputType?: string
  error?: string
  isSelect?: boolean
  options?: { value: string; label: string }[]
  icon?: string
}

const InputField = ({
  control,
  label,
  inputName,
  inputType = "text",
  error,
  isSelect = false,
  options = [],
}: IProps) => {
  const renderTopRow = () => {
    if (error) {
      return (
        <span className="text-red-500 font-medium text-xs flex items-center mb-1">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </span>
      )
    }

    if (label) {
      return <label className="font-medium text-white text-xs block mb-1">{label}</label>
    }

    return null
  }

  const baseClassName =
    "w-full border rounded-lg py-2 px-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm"

  const inputClassName = error
    ? `border-red-300 bg-red-50/50 focus:ring-red-500 focus:border-red-500 ${baseClassName}`
    : `border-gray-200 hover:border-gray-300 focus:border-blue-500 ${baseClassName}`

  const selectClassName = error
    ? `border-red-300 bg-red-50/50 focus:ring-red-500 focus:border-red-500 ${baseClassName}`
    : `border-gray-200 hover:border-gray-300 focus:border-blue-500 ${baseClassName}`

  return (
    <div className="w-full mb-2">
      {renderTopRow()}
      <Controller
        name={inputName}
        control={control}
        render={({ field }) =>
          isSelect ? (
            <select {...field} className={selectClassName}>
              <option value="">Select {label}</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              {...field}
              autoComplete="off"
              type={inputType}
              className={inputClassName}
              placeholder={`Enter ${label?.toLowerCase() || "value"}`}
            />
          )
        }
      />
    </div>
  )
}

export default InputField
