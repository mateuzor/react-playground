import moment from "moment";
function Org() {
  const date = new Date();
  const formattedDate = moment(date).format("MMMM Do YYYY, h:mm:ss a");

  return (
    <>
      <p>The org name:</p>
      <h3>Lending Club</h3>
      <p>The current date and time is {formattedDate}.</p>
    </>
  );
}

export default Org;
