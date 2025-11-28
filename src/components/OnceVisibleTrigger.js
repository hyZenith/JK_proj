import React from "react";

export default class OnceVisibleLoop extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.state = {
            running: false,
            visible: false,
        };
        this.observer = null;
    }

    componentDidMount() {
        if (!this.ref.current) return;

        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    this.setState({ visible: entry.isIntersecting }, () => {
                        if (this.state.visible && !this.state.running) {
                            this.runLoop();
                        }
                    });
                });
            },
            { threshold: 0.1 }
        );

        this.observer.observe(this.ref.current);
    }

    componentWillUnmount() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    runLoop = async () => {
        if (!this.state.visible || this.state.running === true) return;

        this.setState({ running: true });

        try {
            await this.props.onTrigger();
        } catch (err) {
            console.error("OnceVisibleLoop error:", err);
        } finally {
            this.setState({ running: false }, () => {
                // If still visible, run again
                if (this.state.visible) {
                    this.runLoop();
                }
            });
        }
    };

    render() {
        return <div ref={this.ref}>{this.props.children}</div>;
    }
}
