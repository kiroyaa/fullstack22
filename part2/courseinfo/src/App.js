import Course from './components/Course'

const App = ({ courses }) => {
  const rows = () => courses.map(course =>
    <Course key={course.id} course={course} />
  )

  return (
    <div>
      {rows()}
    </div>
  )
}

export default App
