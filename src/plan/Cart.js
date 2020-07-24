import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import CartItem from './CartItem'
  
export default class Cart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { sections, handleRemoveCartItem, handleSelectedSection } = this.props;
        return (
            <Grid item xs={3} id="cart">
                <h2 className={"title pl-15 pt-15"}>Cart:</h2> 
                <div className="box">
                    <div className="scroll-container">
                        <ul className="list scrollable">
                            {sections.map((section, index) => (
                                <CartItem key={section.course_id} itemNumber={index} section={section} handleRemoveCartItem={handleRemoveCartItem} handleSelectedSection={handleSelectedSection} />
                            ))}
                        </ul>
                    </div>
                </div>
            </Grid>
                
        )
    }
}

Cart.propTypes = {
    sections: PropTypes.array.isRequired,
};


