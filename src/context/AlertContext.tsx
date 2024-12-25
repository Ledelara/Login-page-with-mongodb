import { 
    createContext, 
    useState, 
    ReactNode 
} from "react"

interface AlertContextProps {
  open: boolean
  message: string
  color: "success" | "error" | "info" | "warning"
  showAlert: (message: string, color: "success" | "error" | "info" | "warning") => void
  hideAlert: () => void
}

export const AlertContext = createContext<AlertContextProps | undefined>(undefined)

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [color, setColor] = useState<"success" | "error" | "info" | "warning">("success" as "success" | "error" | "info" | "warning")

  const showAlert = (message: string, color: string) => {
    setOpen(true)
    setMessage(message)
    setColor(color as "success" | "error" | "info" | "warning")
  }

  const hideAlert = () => {
    setOpen(false)
  }

  const value = { open, message, showAlert, hideAlert, color }

  return (
    <AlertContext.Provider value={value}>
      {children}
    </AlertContext.Provider>
  )
}