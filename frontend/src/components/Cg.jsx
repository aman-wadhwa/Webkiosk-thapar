import { Link } from "react-router-dom";
function Cg({ user }) {
  const semesters = user?.semester;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-5">
      <div className="w-full max-w-4xl p-5 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-5 text-center">
          CGPA and Semester Details
        </h2>
        <section className="grid grid-cols-3 gap-4">
          {semesters && Object.keys(semesters).length>0 ? (
            Object.keys(semesters).map((semesterNumber) => (
              <Link
                key={semesterNumber}
                className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-lg bg-gray-800 btn-ghost p-10"
                to={`/${user?.roll}/${semesterNumber}`}
              >
                <h3 className="text-lg font-semibold text-white">
                  Semester {semesterNumber}
                </h3>
                <p className="text-md text-white">
                  SGPA: {semesters[semesterNumber].sgpa}
                </p>
              </Link>
            ))
          ) : (
            <div className="col-span-3 text-center text-white">No semester data available</div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Cg;
