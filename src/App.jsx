import { useState } from 'react'
import './App.css'
import InputBox from './components/InputBox'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
    const [amount, setAmount] = useState(0)
    const [from, setFrom] = useState('usd');
    const [to, setTo] = useState('inr');
    const [convertedAmount, setConvertedAmount] = useState(0);

    const currencyInfo = useCurrencyInfo(from);
    const options = Object.keys(currencyInfo);
    const swap = () => {
        setFrom(to);
        setTo(from);
        setConvertedAmount(amount);
        setAmount(convertedAmount);
    }

    const convert = () => {
        setConvertedAmount(amount * currencyInfo[to]);
    }

    return (
        <div
            className="w-full  h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url('https://i.pinimg.com/564x/a8/a7/ea/a8a7ea8a65962c2b92adb8a487110154.jpg')`,
            }}
        >
            <div className='w-full'>
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                    <form onSubmit={(e)=>{
                        e.preventDefault();
                        convert();
                    }}>
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                amount={amount}
                                onAmountChange={(amount)=>{
                                    setAmount(amount);
                                }}
                                currencyOptions={options}
                                onCurrencyChange={(currency)=>{
                                    setFrom(currency);
                                }}
                                selectCurrency={from}
                            />
                        </div>
                        <div className="ralative w-full h-0.5">
                            <button type="button" 
                            className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5'
                            onClick={swap}
                            >
                                Swap
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                amount={convertedAmount}
                                currencyOptions={options}
                                onCurrencyChange={(currency)=>setTo(currency)}
                                selectCurrency={to}
                                amountDisable
                            />
                        </div>
                        <button type="submit" className='w-full bg-blue-600 text-white px-4 py-3 rounded-lg'>
                            Convert {from.toUpperCase()} to {to.toUpperCase()}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default App
