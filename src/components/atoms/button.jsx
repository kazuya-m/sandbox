import { makeStyles} from 'react'

// const useStyles = makeStyles(() => {
//   root: {
//     textAlign: 'center',
//     width: '200px',
//     padding: '10px 20px',
//     border: '#000 1.5px solid',
//     fontWeight: 550,
//     letterSpacing: '0.5em',
//     transition: 'all 0.4s',
//     outline: 'none'
//   }
// });

export const Button = (props) => {

  // const classes = useStyles();

  return (
    <button className={`button`} onClick={()=> props.onClick()}>{props.label}</button>
  )
}