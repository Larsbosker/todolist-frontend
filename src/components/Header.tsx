import React from 'react';

/**
 * Functional component for displaying the title of the application
 * @constructor
 */
function Header() {
    return (
        <div className="header">
            <a href="/"><h1>Todo-list application</h1></a>
        </div>
    );
}

export default Header;