
import React from 'react';

const Calendar = () => {
  const handleEdit = () => {
    alert('Edit button clicked');
  };

  const handleApprove = () => {
    alert('Approve button clicked');
  };

  const handleDecline = () => {
    alert('Decline button clicked');
  };

  const handleViewAll = () => {
    alert('View All Timesheets clicked');
  };

  return (
    <div style={styles.container}>
      <div style={styles.sectionContainer}>
        <div style={styles.header}>
          <h2>Timesheets <button style={styles.addButton}>+</button></h2>
        </div>
        <div>
          <h3 style={styles.subHeader}>Current Timesheet</h3>
          <div style={styles.card}>
            <div style={styles.yellowBar}></div>
            <div style={styles.cardContent}>
              <div>{`{currentDate}`} <span>(currentPeriod)</span></div>
              <div>{`{numHours}`} Hours</div>
            </div>
            <button style={styles.iconButton} onClick={handleEdit}>✎</button>
            <button style={styles.iconButton} onClick={() => alert("Dynamic Action")}>↻</button>
          </div>
        </div>
        <div>
          <h3 style={styles.subHeader}>Previous Timesheets</h3>
          <div style={styles.card}>
            <div style={styles.yellowBar}></div>
            <div style={styles.cardContent}>
              <div>{`{date}`} <span>(period)</span></div>
              <div>{`{hours}`} Hours</div>
            </div>
            <button style={styles.iconButton} onClick={handleEdit}>✎</button>
            <button style={styles.iconButton} onClick={() => alert("Delete")}>−</button>
          </div>
          <div style={styles.card}>
            <div style={styles.yellowBar}></div>
            <div style={styles.cardContent}>
              <div>{`{date}`} <span>(period)</span></div>
              <div>{`{hours}`} Hours</div>
            </div>
            <button style={styles.iconButton} onClick={handleEdit}>✎</button>
            <button style={styles.iconButton} onClick={handleApprove}>✓</button>
          </div>
          <div style={styles.card}>
            <div style={styles.yellowBar}></div>
            <div style={styles.cardContent}>
              <div>{`{date}`} <span>(period)</span></div>
              <div>{`{hours}`} Hours</div>
            </div>
            <button style={styles.iconButton} onClick={handleEdit}>✎</button>
            <button style={styles.iconButton} onClick={handleDecline}>✗</button>
          </div>
          <button style={styles.viewAllButton} onClick={handleViewAll}>View all Timesheets</button>
        </div>
      </div>

      <div style={styles.sectionContainer}>
        <h3 style={styles.sectionHeader}>Announcements</h3>
        <div style={styles.card}>
          <div style={styles.yellowBar}></div>
          <div style={styles.cardContent}>
            <div>Announcement #1</div>
            <div>(Message)</div>
          </div>
        </div>
        <div style={styles.card}>
          <div style={styles.yellowBar}></div>
          <div style={styles.cardContent}>
            <div>Announcement #2</div>
            <div>(Message)</div>
          </div>
        </div>
        <div style={styles.card}>
          <div style={styles.yellowBar}></div>
          <div style={styles.cardContent}>
            <div>Announcement #3</div>
            <div>(Message)</div>
          </div>
        </div>
      </div>

      <div style={styles.sectionContainer}>
        <h3 style={styles.sectionHeader}>Upcoming Holidays</h3>
        <div style={styles.card}>
          <div style={styles.yellowBar}></div>
          <div>{'{11/21} Thanksgiving'}</div>
        </div>
        <div style={styles.card}>
          <div style={styles.yellowBar}></div>
          <div>{'{12/24-12/25} Christmas'}</div>
        </div>
        <div style={styles.card}>
          <div style={styles.yellowBar}></div>
          <div>{'{12/31-01/01} New Years'}</div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    gap: '20px',
    padding: '20px',
  },
  sectionContainer: {
    flex: 1,
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '12px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
    paddingBottom: '10px',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  addButton: {
    fontSize: '20px',
    color: '#fff',
    backgroundColor: '#0066cc',
    border: 'none',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    cursor: 'pointer',
  },
  subHeader: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '10px',
  },
  sectionHeader: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    marginBottom: '15px',
    borderBottom: '1px solid #ddd',
    paddingBottom: '5px',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#286090',
    color: '#fff',
    padding: '15px',
    margin: '10px 0',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  yellowBar: {
    width: '5px',
    height: '100%',
    backgroundColor: '#FFC107',
    marginRight: '15px',
    borderRadius: '2px',
  },
  cardContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  iconButton: {
    backgroundColor: 'transparent',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    marginLeft: '10px',
  },
  viewAllButton: {
    marginTop: '10px',
    padding: '10px',
    width: '100%',
    backgroundColor: '#0066cc',
    color: '#fff',
    borderRadius: '8px',
    cursor: 'pointer',
    border: 'none',
  },
};

export default Calendar;
