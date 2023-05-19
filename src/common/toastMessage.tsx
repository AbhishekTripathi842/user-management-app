// import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
// import Toast from 'react-bootstrap/Toast';

// function toastMessage(props) {
//   const [showA, setShowA] = useState(true);
//   const [showB, setShowB] = useState(true);

//   const toggleShowA = () => setShowA(!showA);
//   const toggleShowB = () => setShowB(!showB);

//   return (
//     <Row>
//       <Col md={6} className="mb-2">
//         {/* <Button onClick={toggleShowA} className="mb-2">
//           Toggle Toast <strong>with</strong> Animation
//         </Button> */}
//         <Toast show={showA} onClose={toggleShowA}>
//           <Toast.Header>
//             <img
//               src="holder.js/20x20?text=%20"
//               className="rounded me-2"
//               alt=""
//             />
//             <strong className="me-auto">Bootstrap</strong>
//             <small>11 mins ago</small>
//           </Toast.Header>
//           <Toast.Body>{props.message}</Toast.Body>
//         </Toast>
//       </Col>
     
//     </Row>
//   );
// }

// export default toastMessage;

























import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

function toastMessage(props:any) {
  return (
    <Row>
      <Col xs={6}>
        <Toast onClose={() => props.setShow(false)} show={props.show} delay={2000} autohide>
          <Toast.Body className='mt-1 ms-2 text-danger'>{props.message}</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
}

export default toastMessage;