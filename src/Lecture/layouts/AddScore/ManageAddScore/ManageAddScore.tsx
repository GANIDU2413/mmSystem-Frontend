// import { useOktaAuth } from '@okta/okta-react';
// import { useState } from 'react';
import { AddScore } from '../AddScore';

export const ManageAddScore = () => {

    // const { authState } = useOktaAuth();

    // const [changeQuantityOfBooksClick, setChangeQuantityOfBooksClick] = useState(false);
    // const [messagesClick, setMessagesClick] = useState(false);

    return (
        <div className='container'>
            <div className='mt-5'>
                <h3>Manage Score</h3>
                <nav>
                    <div className='nav nav-tabs' id='nav-tab' role='tablist'>
                        <button className='nav-link active' id='nav-add-book-tab' data-bs-toggle='tab' 
                            data-bs-target='#nav-add-book' type='button' role='tab' aria-controls='nav-add-book' 
                            aria-selected='false'
                        >
                            Option #1
                        </button>
                        <button className='nav-link' id='nav-quantity-tab' data-bs-toggle='tab' 
                            data-bs-target='#nav-quantity' type='button' role='tab' aria-controls='nav-quantity' 
                            aria-selected='true'
                        >
                            Option #2
                        </button>
                        
                    </div>
                </nav>
                <div className='tab-content' id='nav-tabContent'> 
                    <div className='tab-pane fade show active' id='nav-add-book' role='tabpanel'
                        aria-labelledby='nav-add-book-tab'>
                            <AddScore option={true}/>
                    </div>
                    <div className='tab-pane fade' id='nav-quantity' role='tabpanel' aria-labelledby='nav-quantity-tab'>
                    <AddScore option={false}/>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}