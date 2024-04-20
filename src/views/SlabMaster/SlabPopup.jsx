import React, { useState } from 'react';

function SlabPopup({ onClose, onSubmit }) {
  const [slabMonthly, setSlabMonthly] = useState({
    month_1: 0,
    month_2: 0,
    month_3: 0,
    month_4: 0,
    month_5: 0,
    month_6: 0,
    month_7: 0,
    month_8: 0,
    month_9: 0,
    month_10: 0,
    month_11: 0,
    month_12: 0,
  });

  const handleInputChange = (fieldName, value) => {
    setSlabMonthly((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(slabMonthly);
    onClose();
  };

  return (
    <div className='popup'>
      <div className='row'>
        <table className='table'>
          <thead>
            <tr>
              <th>Apr-1</th>
              <th>May-2</th>
              <th>June-3</th>
              <th>July-4</th>
              <th>Aug-5</th>
              <th>Sep-6</th>
              <th>Oct-7</th>
              <th>Nov-8</th>
              <th>Dec-9</th>
              <th>Jan-10</th>
              <th>Feb-11</th>
              <th>Mar-12</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type='text'
                  className='form-control'
                  value={slabMonthly.month_1}
                  onChange={(e) => handleInputChange('month_1', e.target.value)}
                />
              </td>
              <td>
                <input
                  type='text'
                  className='form-control'
                  value={slabMonthly.month_2}
                  onChange={(e) => handleInputChange('month_2', e.target.value)}
                />
              </td>
              <td>
                <input
                  type='text'
                  className='form-control'
                  value={slabMonthly.month_3}
                  onChange={(e) => handleInputChange('month_3', e.target.value)}
                />
              </td>
              <td>
                <input
                  type='text'
                  className='form-control'
                  value={slabMonthly.month_4}
                  onChange={(e) => handleInputChange('month_4', e.target.value)}
                />
              </td>
              <td>
                <input
                  type='text'
                  className='form-control'
                  value={slabMonthly.month_5}
                  onChange={(e) => handleInputChange('month_5', e.target.value)}
                />
              </td>
              <td>
                <input
                  type='text'
                  className='form-control'
                  value={slabMonthly.month_6}
                  onChange={(e) => handleInputChange('month_6', e.target.value)}
                />
              </td>
              <td>
                <input
                  type='text'
                  className='form-control'
                  value={slabMonthly.month_7}
                  onChange={(e) => handleInputChange('month_7', e.target.value)}
                />
              </td>
              <td>
                <input
                  type='text'
                  className='form-control'
                  value={slabMonthly.month_8}
                  onChange={(e) => handleInputChange('month_8', e.target.value)}
                />
              </td>
              <td>
                <input
                  type='text'
                  className='form-control'
                  value={slabMonthly.month_9}
                  onChange={(e) => handleInputChange('month_9', e.target.value)}
                />
              </td>
              <td>
                <input
                  type='text'
                  className='form-control'
                  value={slabMonthly.month_10}
                  onChange={(e) =>
                    handleInputChange('month_10', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type='text'
                  className='form-control'
                  value={slabMonthly.month_11}
                  onChange={(e) =>
                    handleInputChange('month_11', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type='text'
                  className='form-control'
                  value={slabMonthly.month_12}
                  onChange={(e) =>
                    handleInputChange('month_12', e.target.value)
                  }
                />
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default SlabPopup;
