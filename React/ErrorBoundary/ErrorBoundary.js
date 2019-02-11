class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            info: null
        };
    }
    componentDidCatch(error, info) {
        this.setState({
            hasError: true,
            error: error,
            info: info
        });
    }
    render() {
        if (this.state.hasError) {
            return (
            <div>
            <h1>Oops, something went wrong :(</h1>
            <p>The error: {this.state.error.toString()}</p>
            <p>Where it occured: {this.state.info.componentStack}</p>
            </div>
        );
        }
        return this.props.children;
    }
}

class Location extends React.Component {
    state = {
        locations: [
            {
                "name": "Abovyan",
                "zone": "Kotayk State",
                "region": "Central"
            },
            {
                "name": "Yerevan",
                "zone": "Xrer",
                "region": "Central"
            },
            {
                "name": "Kond",
                "zone": "North Central",
                "region": "South South"
            },
            {
                "name": "Shengavit",
                "zone": "South Yerevan",
                "region": "South"
            },
            {

            }
        ]
    };
    render() {
        return (
            <div>
                <div>
                    <div>
                        <h2>Locations</h2>
                    </div>
                </div>
                <div>
                    {this.state.locations
                        .map(location =>
                        <LocationCard key={location.id} {...location} />
                    )}
                </div>

            // OR
                <div>
                    {this.state.locations
                        .map(location =>
                        <ErrorBoundary>
                        // Should render all locations, but the empty instance
                            <LocationCard key={location.id} {...location} />
                        </ErrorBoundary>
                    )}
                </div>

            </div>
        )
    }
}

const LocationCard = (props) => {
    return (
        <div>
            <hr />
            <p><b>Name:</b> {props.name.toUpperCase()}</p>
            <p><b>Zone:</b> {props.zone}</p>
            <p><b>Region:</b> {props.region}</p>
            <hr />
        </div>
    )
};

const App = () => (
    <div>
        <ErrorBoundary>
            <Location />
        </ErrorBoundary>
    </div>
)

ReactDOM.render(<App />, document.getElementById("root"));

/**
 OUTPUT --------
 Oops, something went wrong :(
 The error: TypeError: Cannot read property 'toUpperCase' of undefined

 Where it occured:
    in LocationCard (created by Location)
    in div (created by Location)
    in div (created by Location)
    in Location (created by App)
    in ErrorBoundary (created by App)
    in div (created by App) in App
 */
