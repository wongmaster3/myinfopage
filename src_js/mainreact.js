// Start of Project Rendering
class ProjectComponent extends React.Component {
    render() {
        return React.createElement("div", {
            className: "panel"
        }, React.createElement("h1", null, this.props.title), this.props.description, React.createElement("div", {
                className: "center-project-content",
            }
            , this.props.link != "Data Not Available at this Time" ? React.createElement("a", {
                className: "view-project-button",
                href: this.props.link
            }, "Click Here to Take a Look") : React.createElement("div", {
                class: "center-project-content",
            }, "Data Not Available at this Time")));
    }
}

var listItems = data.Projects.map(function (project) {
    return React.createElement(ProjectComponent, {
        title: project.ProjectName,
        description: project.Description,
        link: project.ReferenceLink
    }, null)
});
React.render(React.createElement("div", null, listItems), document.getElementById('root'));

// End of Project Rendering

// class Hello extends React.Component {
//     render() {
//         return React.createElement('div', null, `Hello ${this.props.toWhat}`);
//     }
// }
//
// React.render(
//     React.createElement(Hello, {toWhat: 'World'}, null),
//     document.getElementById('root')
// );