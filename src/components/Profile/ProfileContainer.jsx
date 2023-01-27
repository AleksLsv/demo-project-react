import React from "react";
import Profile from "./Profile";
//import axios from "axios";
import {connect} from "react-redux";
import {getUserProfile} from "../../redux/profile-reducer";
import {Navigate, useLocation, useNavigate, useParams} from "react-router-dom";
//import {userAPI} from "../../api/api";


class ProfileContainer extends React.Component {

    componentDidMount() {

        let userId = this.props.router.params.userId;

        if (!userId)
        {userId = 2}

        this.props.getUserProfile(userId);

        /*axios.get(`https://social-network.samuraijs.com/api/1.0/profile/`+userId)*/
        /*userAPI.getProfile(userId).then(response => {
                this.props.setUserProfile(response.data);
            });*/

    }

    render() {
        if (!this.props.isAuth) {
            return <Navigate to={'/login'} />
        }

        return (
            <Profile {...this.props} profile ={this.props.profile} />
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
});


function withRouter(Component) {

    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}


export default connect(mapStateToProps, {getUserProfile}) (withRouter(ProfileContainer));