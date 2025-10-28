import { useContext, useState, type ChangeEvent, type SyntheticEvent } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useQuery } from '@tanstack/react-query'
import { Record } from './components/records'
import { useMutation, QueryClient, useQueryClient } from '@tanstack/react-query'
import { FiltersBar } from './components/filtersBar'
import { AppContext } from './context/AppContext'
import Ashok_Emblem from './assets/Ashok_Emblem.png'

interface record {
  state: string,
  district: string,
  market: string,
  commodity: string,
  variety: string,
  max_price: string,
  min_price: string,
  modal_price: string,
  arrival_date: string
}

function App() {

  const { district, states } = useContext(AppContext)
  let date = new Date();
  const { data, isSuccess, isFetching, isError } = useQuery({
    queryKey: ['info'],
    queryFn: async () => {
      let tempdata = await getInfo({ states, district });
      console.log('data refreshed')
      return tempdata;
    },
    staleTime: 1000,
    refetchInterval: 3600000
  })
  console.log(data)
  console.log(date)
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (tempdata2: { states: string, district: string }) => getInfo(tempdata2),
    onSuccess: (data, variable, context) => {
      queryClient.invalidateQueries({
        queryKey: ['info']
      })
    },
    onError: (error) => {
      console.log("error while fetching : ", error)
    }
  })

  function searchData() {
    let tempdata2 = {
      states,
      district
    }
    console.log('data : ', tempdata2)
    mutate(tempdata2)
  }

  let totalMax_price = 0;
  let totalMin_price = 0;
  let cheapestPrice = Number.MAX_SAFE_INTEGER;
  let highestPrice = Number.MIN_SAFE_INTEGER;
  let placeWithHighestPrice = '';
  let placeWithLowestPrice = '';
  let cheapestCommodity = ''
  let highestCommodity = ''
  let currentDistrict = ''
  let currentState = ''
  let currentDistrict2 = ''
  let currentState2 = ''
  return (
    <>
      <div className='flex items-center justify-center bg-blue-300 mx-auto w-full'>
        <div className=''><img src={Ashok_Emblem} className='w-[100px] h-[100px]' /></div>
        <div className='flex flex-col items-center justify-center'>
          {
            isSuccess && data.org.map((elem: String) => {

              return (
                <div className='mx-auto text-center text-2xl font-semibold '>{elem}</div>
              )
            })
          }
        </div>
      </div>
      <div className='flex items-center justify-around w-full mx-auto'>
        <FiltersBar></FiltersBar>
        <button onClick={searchData} className='border-2 border-[#0066CE] px-5 rounded-2xl text-[#0066CE] hover:bg-[#0066CE] hover:text-white transition-all ease-in-out'>Search</button>
      </div>
      {isSuccess && <div className='font-light mx-auto px-5 w-full'>Last Updated : {date.toDateString().split(' ').join('-')}</div>}
      <div className='flex items-center justify-center overflow-x-scroll w-full'>
        {
          isFetching && <h1 className='text-4xl my-9'>Data is loading...</h1>
        }
        {
          !isFetching && isSuccess && data.records.length == 0 && <div className='text-4xl my-9'>Data not available</div>
        }
        {
          !isFetching && isSuccess && data.records.length != 0 &&
          <div className='w-full p-2.5'>
            <table className=' table-auto border-seperate border-spacing-5 border border-gray-300 rounded-2xl'>
              <thead>
                <tr className='bg-black text-white'>
                  <th className='px-5 border border-gray-400'>STATE</th>
                  <th className='px-5 border border-gray-400'>ARRIVAL_DATE</th>
                  <th className='px-5 border border-gray-400'>COMMODITY</th>
                  <th className='px-5 border border-gray-400'>DISTRICT</th>
                  <th className='px-5 border border-gray-400'>MARKET</th>
                  <th className='px-5 border border-gray-400'>MAX_PRICE</th>
                  <th className='px-5 border border-gray-400'>MIN_PRICE</th>
                  <th className='px-5 border border-gray-400'>MODAL_PRICE</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.records.map((elem: record) => {
                    if (cheapestPrice > Number(elem.min_price)) {
                      cheapestPrice = Number(elem.min_price);
                      cheapestCommodity = elem.commodity;
                      currentDistrict = elem.district;
                      currentState = elem.state;
                    }
                    if (highestPrice < Number(elem.max_price)) {
                      highestPrice = Number(elem.max_price);
                      highestCommodity = elem.commodity;
                      currentDistrict2 = elem.district;
                      currentState2 = elem.state;
                    }
                    return (
                      <tr>
                        <td className='border px-5 text-center border-gray-400'>{elem.state}</td>
                        <td className='border px-5 text-center border-gray-400'>{elem.arrival_date}</td>
                        <td className='border px-5 text-center border-gray-400'>{elem.commodity}</td>
                        <td className='border px-5 text-center border-gray-400'>{elem.district}</td>
                        <td className='border px-5 text-center border-gray-400'>{elem.market}</td>
                        <td className='border px-5 text-center border-gray-400'>Rs. {elem.max_price}/quintal</td>
                        <td className='border px-5 text-center border-gray-400'>Rs. {elem.min_price}/quintal</td>
                        <td className='border px-5 text-center border-gray-400'>Rs. {elem.modal_price}/quintal</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>

        }
      </div>
      {
        isSuccess && data.records.length != 0 &&
        <div className='my-5 grid md:grid-cols-2 gap-2 w-full rounded-2xl mx-auto'>
          <div className='border rounded-2xl p-5 w-full shadow-2xl '>Today's most expensive commodity in <span className='font-semibold'>{currentDistrict}</span> of <span className='font-semibold'>{currentState}</span>  : <span className='font-semibold'>{highestCommodity}</span><br></br>Price : <span className='text-green-400 font-semibold'>Rs. {cheapestPrice}/quintal</span></div>
          <div className='border rounded-2xl p-5 w-full shadow-2xl '>Today's most cheapest commodity in <span className='font-semibold'>{currentDistrict2}</span> of <span className='font-semibold'>{currentState2}</span> : <span className='font-semibold'>{cheapestCommodity}</span><br></br>Price : <span className='text-green-400 font-semibold'>Rs. {highestPrice}/quintal</span></div>
        </div>

      }
    </>
  )
}

async function getInfo(detail: { states: string, district: string }) {
  try {
    console.log('detail : ', detail)
    let seperated_state = ''
    let url = ''
    if (detail.states == '') {
      seperated_state = 'Uttar%20Pradesh'
    }
    else {
      seperated_state = detail.states.split(' ').join('%20')
    }
    console.log('seperated_state : ', seperated_state)
    console.log('state : ', detail.states)
    console.log('district : ', detail.district)
    if (seperated_state != '' && detail.district != '') {
      url = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&filters%5Bstate.keyword%5D=' + seperated_state + '&filters%5Bdistrict%5D=' + detail.district;

    }
    else {
      url = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&filters%5Bstate.keyword%5D=' + seperated_state;

    }

    let response = await fetch(url)
    let data = await response.json();
    console.log('data : ', data)
    return data;
  } catch (error) {
    console.log('error while fetching data : ', error)
  }
}

export default App
