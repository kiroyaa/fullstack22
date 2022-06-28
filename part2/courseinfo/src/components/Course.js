const Header = ({ course }) => {
  return <h1>{course.name}</h1>
}

const Part = (props) => {
  return (
    <div>
      <p>{props.content} {props.num}</p>
    </div>
  )
}

const Content = ({ course }) => {
  const array = course.parts
  const rows = () => array.map(part =>
    <Part content={part.name} num={part.exercises} key={part.id} />
  )
  return (
    <div>
      {rows()}
    </div>
  )
}

const Total = (props) => {
  const totalAmount = props.course.parts.reduce(function(sum, part) {
    return sum + part.exercises
  }, 0)

  return (
    <div>
      <p><b>Total of {totalAmount} exercises</b></p>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default Course
