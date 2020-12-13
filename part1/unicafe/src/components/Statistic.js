const Statistic = ({ text, operation }) => (
  <table>
    <tbody>
      <tr>
        <td>{`${text}: ${operation}`}</td>
      </tr>
    </tbody>
  </table>
)

export default Statistic
