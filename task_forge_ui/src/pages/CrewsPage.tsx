import React, { useEffect, useState } from "react";
import axios from "axios";
import CrewCard from "../components/CrewCard";
import ManageCrewModal from "../components/ManageCrewModal";
import CrewFormModal from "../components/CrewFormModal";

interface Crew {
  id: number;
  supervisorId: number | null;
  name: string;
}

interface User {
  id: number;
  name: string;
}

interface CrewMember {
  crewId: number;
  userId: number;
  role: string;
}

const CrewsPage: React.FC = () => {
  const [crews, setCrews] = useState<Crew[]>([]);
  const [supervisors, setSupervisors] = useState<{ [key: number]: string }>({});
  const [crewMembers, setCrewMembers] = useState<{ [key: number]: string[] }>(
    {}
  );
  const [selectedCrew, setSelectedCrew] = useState<Crew | null>(null);
  const [userRole, setUserRole] = useState<string>("project manager"); // Mock role for now
  const [showManageModal, setShowManageModal] = useState(false);
  const [showCrewForm, setShowCrewForm] = useState(false);

  useEffect(() => {
    fetchCrews();
  }, []);

  const fetchCrews = async () => {
    try {
      const { data: crewsData } = await axios.get(
        "http://localhost:5272/crews/all-crews"
      );
      setCrews(crewsData);

      // Fetch supervisor names
      const supervisorPromises = crewsData.map(async (crew: Crew) => {
        if (crew.supervisorId) {
          const { data: supervisor } = await axios.get(
            `http://localhost:5272/get-user?userId=${crew.supervisorId}`
          );
          return { [crew.id]: supervisor.name };
        }
        return { [crew.id]: "No Supervisor" };
      });

      // Fetch crew members
      const memberPromises = crewsData.map(async (crew: Crew) => {
        const { data: members } = await axios.get(
          `http://localhost:5272/crews/get-all-members?crewId=${crew.id}`
        );
        const memberNames = await Promise.all(
          members.map(async (member: CrewMember) => {
            const { data: user } = await axios.get(
              `http://localhost:5272/get-user?userId=${member.userId}`
            );
            return user.name;
          })
        );
        return { [crew.id]: memberNames };
      });

      const supervisorsResult = await Promise.all(supervisorPromises);
      const membersResult = await Promise.all(memberPromises);

      setSupervisors(Object.assign({}, ...supervisorsResult));
      setCrewMembers(Object.assign({}, ...membersResult));
    } catch (error) {
      console.error("Error fetching crews:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Crews</h2>
      {userRole === "project manager" && (
        <button
          className="btn btn-success mb-3"
          onClick={() => setShowCrewForm(true)}
        >
          + Create New Crew
        </button>
      )}

      <div className="row">
        {crews.map((crew) => (
          <div key={crew.id} className="col-md-6 mb-4">
            <CrewCard
              crewId={crew.id}
              crewName={crew.name}
              supervisorName={supervisors[crew.id] || "No Supervisor"}
              members={crewMembers[crew.id] || []}
              onManageCrew={() => {
                setSelectedCrew(crew);
                setShowManageModal(true);
              }}
              onEditCrew={() => {
                setSelectedCrew(crew);
                setShowCrewForm(true);
              }}
              onDeleteCrew={async () => {
                try {
                  await axios.delete(
                    `http://localhost:5272/crews/delete-crew?crewId=${crew.id}`
                  );
                  fetchCrews();
                } catch (error) {
                  console.error("Error deleting crew:", error);
                }
              }}
              userRole={userRole}
            />
          </div>
        ))}
      </div>

      {selectedCrew && (
        <ManageCrewModal
          show={showManageModal}
          handleClose={() => setShowManageModal(false)}
          crewId={selectedCrew.id}
          crewName={selectedCrew.name}
        />
      )}

      <CrewFormModal
        show={showCrewForm}
        handleClose={() => setShowCrewForm(false)}
        refreshCrews={fetchCrews}
        crew={selectedCrew}
      />
    </div>
  );
};

export default CrewsPage;
