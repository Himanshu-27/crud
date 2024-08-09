import { useDispatch, useSelector } from 'react-redux'
import Form from './components/form';
import { useEffect, useState } from 'react';
import { setInitialState, deleteInfo, updateInfo } from './personInfoSlice';

function App() {
  const personInfo = useSelector(state => state.personInfo)
  const dispatch = useDispatch()
  const [infoToUpdate, setInfoToUpdate] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('personInfo')) || []
    dispatch(setInitialState(savedData))
  }, [])

  const handleUpdate = id => {
    const isInfoPresent = personInfo.filter(info => info.id !== infoToUpdate).find(info => {
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

    if (isInfoPresent) return

    if ([name, email, phone].includes('')) {
      setError('Form field blank')
      return
    }
    dispatch(updateInfo({
      name,
      email,
      phone,
      id
    }))
    setInfoToUpdate(null)
    setError('')
  }

  const handleUpdateBeforeEdit = id => {
    const info = personInfo.find(info => info.id === id)
    setName(info.name)
    setEmail(info.email)
    setPhone(info.phone)
    setInfoToUpdate(id)
  }

  return (
    <div className="App">
      {personInfo.length ? <div className='table'>
        <div className='table-field'>
          <div>Name</div>
          <div>Email</div>
          <div>Phone</div>
        </div>
        {personInfo.map(info => {
          if (info.id === infoToUpdate) {
            return (<div className='table-field' key={info.id}>
              <input id="name" type="text" name="name" onChange={e => setName(e.target.value)} value={name} />
              <input id="name" type="text" name="name" onChange={e => setEmail(e.target.value)} value={email} />
              <input id="name" type="text" name="name" onChange={e => setPhone(e.target.value)} value={phone} />
              <button onClick={() => dispatch(deleteInfo(info.id))}>Delete</button>
              <button onClick={() => handleUpdate(info.id)}>Update</button>
            </div>)
          } else {
            return (
              <div className='table-field' key={info.id}>
                <div>{info.name}</div>
                <div>{info.email}</div>
                <div>{info.phone}</div>
                <button onClick={() => dispatch(deleteInfo(info.id))}>Delete</button>
                <button onClick={() => handleUpdateBeforeEdit(info.id)}>Update</button>
              </div>
            )
          }
        })}
      </div> : null}
      {error ? <div style={{ color: 'red' }}>{error}</div> : null}
      <Form />
    </div>
  );
}

export default App;
