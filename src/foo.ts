import _      = require('lodash');
import React  = require('react');
import Router = require('react-router');

var DOM = React.DOM;

class Foo extends React.Component<any, any> {

    // NOTE: this is needed to get access to 'this.context.router'
    static contextTypes: React.ValidationMap<Router.Context> = {
        router: React.PropTypes.func
    }

    componentDidMount = () => {
        var params = this.props.params;
        var query  = this.props.query;

        console.log("MOUNT ", this.props, params, query);
    }

    componentWillReceiveProps = (nextProps) => {
        console.log("NEXT  ", nextProps, nextProps.params, nextProps.query);
    }

    render = () => {

        var router = this.context.router;

        // NOTE: these 2 ways are identical

        // var params = this.context.router.getCurrentParams();
        // var query  = this.context.router.getCurrentQuery();

        var params = this.props.params;
        var query  = this.props.query;

        console.log("RENDER", this.props, params, query);

        if (_.has(query, 'a') === false) {
            router.transitionTo("/foo", {}, _.extend({}, query, { a: 1 }));
        }

        return DOM.div(
            {},
            "This is Foo",
            DOM.p({}, `params: ${JSON.stringify(params)}`),
            DOM.p({}, `query: ${JSON.stringify(query)}`))
    }
}

export = Foo;