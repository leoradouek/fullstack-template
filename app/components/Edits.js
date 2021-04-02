// was in single component instead of putting projects assigned into separate React component

/* <div>
            <h1>Projects assigned to {robot.name}:</h1>
            {projects.length > 0 ? (
              projects.map((project) => (
                <div key={project.id} id="single-robot-project">
                  <h3>{project.title}</h3>
                  <div id="single-details">
                    <p>Description: {project.description}</p>
                    <p>Deadline: {project.deadline}</p>
                    <p>Priority: {project.priority}</p>
                  </div>
                  <button type="button" className="delete">
                    Unassign
                  </button>
                </div>
              ))
            ) : (
              <p>{robot.name} does not have any projects assigned</p>
            )}
          </div> */

// FORM : in SingleRobot

// <form onSubmit={this.handleSubmit}>
//             <div className="form-container">
//               <h1>Update Robot</h1>
//               <p>Please fill out this form to create a new robot:</p>

//               <label htmlFor="robotName">Robot Name: </label>
//               <input
//                 name="robotName"
//                 value={robotName}
//                 onChange={this.handleChange}
//               />

//               <label htmlFor="robotName">Fuel Type: </label>
//               <input
//                 name="fuelType"
//                 value={fuelType}
//                 onChange={this.handleChange}
//               />

//               <label htmlFor="fuelLevel">Fuel Level: </label>
//               <input
//                 name="fuelLevel"
//                 value={fuelLevel}
//                 onChange={this.handleChange}
//               />

//               <button type="submit" className="submit">
//                 Save Changes
//               </button>
//             </div>
//           </form>
