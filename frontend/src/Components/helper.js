export const scheduleAssignment = async (assignment) => {
  
  try {
    let createdAssignment = await fetch(
      "https://virtualclassloc.herokuapp.com/tutor/schedule",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assignment),
      }
    );
    console.log(createdAssignment);
  } catch (error) {
    console.log(error);
  }
};
export const getAssignment = async (batchId) => {
  try {
    const uid = localStorage.getItem("userId");
    let assignments = await fetch(
      `https://virtualclassloc.herokuapp.com/tutor/assignments?batchId=${batchId}&student_id=${uid}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    let allAssignments = await assignments.json();
    console.log(allAssignments);
    return allAssignments;
  } catch (error) {
    console.log(error);
  }
};

export const sendResponse = async (response) => {
  try {
    let submittedResponse = await fetch(
      `https://virtualclassloc.herokuapp.com/student/response`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(response),
      }
    );
    console.log(submittedResponse);
  } catch (error) {
    console.log(error);
  }
};
