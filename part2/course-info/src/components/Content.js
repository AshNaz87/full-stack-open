import Part from './Part'
import SubPart from './SubPart'
import Stats from './Stats'

const Content = ({ courses }) => (
  <>
    {courses.map((course) => (
      <>
        <Part partName={course.name} key={course.id} />
        {course.parts.map((subCourse) => (
          <SubPart
            subPartName={subCourse.name}
            exercises={subCourse.exercises}
            key={`${course.id}.${subCourse.id}`}
          />
        ))}
        <Stats exerciseTotal={course.parts.reduce((acc, curr) => (acc + curr.exercises), 0)} />
      </>
    ))}
  </>
)

export default Content
