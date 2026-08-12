import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <div>
      <h1>Упс...Такой страницы нет</h1>
      <Link to='/'>Вернуться на главную</Link>
    </div>
  )
}
