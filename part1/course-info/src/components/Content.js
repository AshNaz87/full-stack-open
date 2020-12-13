import Part from './Part'

const Content = ({ course }) => (
  <div>
    {course.parts.map(part => (
      <Part partName={part.name} exercises={part.exercises} />
    ))}
  </div>
)

export default Content
