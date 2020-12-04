import './index.css';

function Button(props) {
    function _getClassName() {
        let className = 'calc-button';

        if (props.isTopOperators) className += ' top-operators';
        if (props.isNumber) className += ' numbers';
        if (props.isRightSideOperators) className += ' right-side-operators';

        return className;
    }

    let className = _getClassName();

    return (
        <button className={className} onClick={props.onClick}>
            {props.title}
        </button>
    )
}

export default Button;
