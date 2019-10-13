import React, {Component} from 'react';

import {
    createStackNavigator,
    createAppContainer,
    createMaterialTopTabNavigator
} from 'react-navigation';

import {StackViewStyleInterpolator} from 'react-navigation-stack';

import Assets from '../resources/assets';

import Inputs from '../inputs/inputs';
import InputDetails from '../inputs/inputDetails';
import InputAdd from '../inputs/inputAdd';

import Outputs from '../outputs/outputs';
import OutputDetails from '../outputs/outputDetails';
import OutputAdd from '../outputs/outputAdd';

import Other from './other';

import Projects from '../projects/projects';
import ProjectDetails from '../projects/projectDetails';
import ProjectAdd from '../projects/projectAdd';

import Users from '../users/users';
import UserDetails from '../users/userDetails';
import UserAdd from '../users/userAdd';

import Audit from '../audit/audit';
import AuditDetails from '../audit/auditDetails';

const AssetsTab = createStackNavigator({
        Assets
    }, {
        headerMode: 'none',
        transitionConfig: () => ({
            screenInterpolator: sceneProps => {
                return StackViewStyleInterpolator.forHorizontal(sceneProps);
            }
        })
    }
);

const OutputsTab = createStackNavigator({
        Outputs,
        OutputDetails,
        OutputAdd
    }, {
        headerMode: 'none',
        transitionConfig: () => ({
            screenInterpolator: sceneProps => {
                return StackViewStyleInterpolator.forHorizontal(sceneProps);
            }
        })
    }
);

const InputsTab = createStackNavigator({
        Inputs,
        InputDetails,
        InputAdd
    }, {
        headerMode: 'none',
        transitionConfig: () => ({
            screenInterpolator: sceneProps => {
                return StackViewStyleInterpolator.forHorizontal(sceneProps);
            }
        })
    }
);

const OtherTab = createStackNavigator({
        Other,
        Projects
    }, {
        headerMode: 'none',
        transitionConfig: () => ({
            screenInterpolator: sceneProps => {
                return StackViewStyleInterpolator.forHorizontal(sceneProps);
            }
        })
    }
);

class Logout extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.didFocusListener = this.props.navigation.addListener(
            'didFocus',
            () => {
                this.quitComponent();
            }
        );
    }

    quitComponent() {
        appConfig.onLogOut();
    }

    render() {
        return null;
    }
}

const tabBarOptions = {
    style: {
        backgroundColor: 'white'
    },
    labelStyle: {
        color: 'darkblue',
        fontWeight: 'bold'
    },
    upperCaseLabel: false,
    indicatorStyle: {backgroundColor: 'darkblue'}
};

const TabNavigator = createMaterialTopTabNavigator({
        Assets: AssetsTab,
        Outputs: OutputsTab,
        Inputs: InputsTab,
        Other: OtherTab
    },
    {
        tabBarPosition: 'top',
        tabBarOptions
    }
);

export default createAppContainer(TabNavigator);
