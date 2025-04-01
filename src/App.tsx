import { QRCodeSVG } from 'qrcode.react'
import { useEffect, useState } from 'react'
import { FaLock } from 'react-icons/fa'
import { GrValidate } from 'react-icons/gr'

function App() {
  const [solde, setSolde] = useState(40)
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [actionTaken, setActionTaken] = useState(false)
  const data = `prenom:Loukas,nom:Dupont,solde:${solde},date:${new Date().toLocaleDateString()},heure:${new Date().toLocaleTimeString()}`
  const prix = 10

  const handleClick = () => {
    if (solde >= prix) {
      setSolde(solde - prix)
      setModalMessage(`Accès autorisé, montant débité: ${prix} euros`)
      setActionTaken(true)
    } else {
      setModalMessage('Solde insuffisant')
      setActionTaken(false) 
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setTimeout(() => {
      setShowModal(false)
    }, 5000)
  }

  useEffect(() => {
    if (showModal) {
      closeModal()
    }
  }, [showModal])

  function handleRecharge(): void {
    setSolde(40)
  }

  return (
    <>
      <div className='max-h-screen'>
        <nav className='px-8 py-4 flex justify-between items-center bg-gray-800 text-white'>
          <h1>Mon Compte</h1>
          <p className='text-green-200'>solde : {solde}€</p>
        </nav>
        <section className='flex flex-col gap-6 items-center justify-center h-screen bg-gray-100'>
          <p className='text-xl font-bold'>Bonjour Louka</p>
          <div className='p-10 bg-white shadow-md rounded-lg'>
            <QRCodeSVG
              value={data}
              size={256}
              level='H'
              style={{ width: '256px', height: '256px' }}
            />
          </div>
          <div className='flex gap-6'>
            <button onClick={handleRecharge} className='px-6 py-2 bg-gray-800 text-white rounded-full shadow-md'>
              Recharger
            </button>
            <button onClick={handleClick} className='px-6 py-2 bg-gray-800 text-white rounded-full shadow-md'>
              Scanner
            </button>
          </div>
          
        </section>
      </div>

      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black/50'>
          <div className='bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center gap-4'>
            {actionTaken ? (
              <GrValidate className='h-10 w-10 text-green-500' />
            ) : (
              <FaLock className='h-10 w-10 text-red-500' />
            )}
            <p className='text-center'>{modalMessage}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default App
