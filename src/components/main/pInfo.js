



function PInfo(props) {
  return (
    <>
      <p className='pInfo'>
        {props.children}
        {props.info}
      </p>
    </>
  )
}

export default PInfo