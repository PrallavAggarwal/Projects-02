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


export function Record({ state, district, market, commodity, variety, max_price, min_price, modal_price, arrival_date }: record) {


  return (
    <>
      <div className="flex gap-1 border ">
        <div>{state}</div>
        <div>{district}</div>
        <div>{market}</div>
        <div>{commodity}</div>
        <div>{variety}</div>
        <div>{max_price}</div>
        <div>{min_price}</div>
        <div>{modal_price}</div>
        <div>{arrival_date}</div>
      </div>
    </>
  )
}
