const DisplayVoteCount = ({ vote }) => (
  <p>
    Has {vote} {vote === 1 ? 'vote' : 'votes'}
  </p>
)

export default DisplayVoteCount
