import { useCallback, useState } from 'react'

const useToggleState = (initialValue: boolean) => {
    const [value, setValue] = useState(initialValue)
    const toggleValue = useCallback(() => setValue(v => !v), [])
    return [value, toggleValue, setValue] as const
}

export default useToggleState
