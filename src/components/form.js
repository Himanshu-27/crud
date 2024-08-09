import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addInfo } from '../personInfoSlice'

export default function Form() {
    const [error, setError] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const personInfo = useSelector(state => state.personInfo)
    const dispatch = useDispatch()

    const handleSubmit = e => {
        e.preventDefault()

        const isInfoPresent = personInfo.find(info => {
            if (info.name === name) {
                setError('Name already exists')
                return true
            }
            if (info.email === email) {
                setError('Email already exists')
                return true
            }
            if (info.phone === phone) {
                setError('Phone already exists')
                return true
            }
            return false
        })

        if (!isInfoPresent) {
            if ([name, email, phone].includes('')) {
                setError('Form field blank')
                return
            }
            dispatch(addInfo({
                name,
                email,
                phone,
                id: (personInfo[personInfo.length - 1] || { id: 0 }).id + 1
            }))
            setName('')
            setEmail('')
            setPhone('')
            setError('')
        }
    }

    return (
        <div>
            <div className="error">{error}</div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input id="name" type="text" name="name" onChange={e => setName(e.target.value)} value={name} />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input id="email" type="text" name="email" onChange={e => setEmail(e.target.value)} value={email} />
                </div>
                <div>
                    <label htmlFor="phone">Phone:</label>
                    <input id="phone" type="text" name="phone" onChange={e => setPhone(e.target.value)} value={phone} />
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}