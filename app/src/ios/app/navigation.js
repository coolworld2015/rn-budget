import React from 'react';
import {createBottomTabNavigator, createStackNavigator, createAppContainer} from 'react-navigation';

import Assets from '../resources/assets';

import Inputs from '../inputs/inputs';
import InputDetails from '../inputs/inputDetails';
import InputAdd from '../inputs/inputAdd';

import Outputs from '../outputs/outputs';
import OutputDetails from '../outputs/outputDetails';
import OutputAdd from '../outputs/outputAdd';

import Users from '../users/users';
import UserDetails from '../users/userDetails';
import UserAdd from '../users/userAdd';

import Audit from '../audit/audit';
import AuditDetails from '../audit/auditDetails';
import {Image} from 'react-native';
import Other from "../../android/app/other";
import Search from "../../android/search/search";
import SearchResults from "../../android/search/searchResults";
import SearchDetails from "../../android/search/searchDetails";
import Projects from "../../android/projects/projects";
import ProjectDetails from "../../android/projects/projectDetails";
import ProjectAdd from "../../android/projects/projectAdd";
import Departments from "../../android/departments/departments";
import DepartmentDetails from "../../android/departments/departmentDetails";
import DepartmentAdd from "../../android/departments/departmentAdd";
import Employees from "../../android/employees/employees";
import EmployeeDetails from "../../android/employees/employeeDetails";
import EmployeeAdd from "../../android/employees/employeeAdd";
import Resources from "../../android/resources/resources";
import ResourceDetails from "../../android/resources/resourceDetails";
import ResourceAdd from "../../android/resources/resourceAdd";
import Config from "../../android/app/config";

const AssetsTab = createStackNavigator({
    Assets
});

const OutputsTab = createStackNavigator({
    Outputs,
    OutputDetails,
    OutputAdd
});

const InputsTab = createStackNavigator({
    Inputs,
    InputDetails,
    InputAdd
});

const OtherTab = createStackNavigator({
    Other,

    Search,
    SearchResults,
    SearchDetails,

    Projects,
    ProjectDetails,
    ProjectAdd,

    Departments,
    DepartmentDetails,
    DepartmentAdd,

    Employees,
    EmployeeDetails,
    EmployeeAdd,

    Resources,
    ResourceDetails,
    ResourceAdd,

    Users,
    UserDetails,
    UserAdd,

    Audit,
    AuditDetails,

    Config
});

const TabNavigator = createBottomTabNavigator({
        Assets: AssetsTab,
        Outputs: OutputsTab,
        Inputs: InputsTab,
        Other: OtherTab
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, horizontal, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;

                if (routeName === 'Assets') {
                    iconName = <Image
                        source={require('../../../img/assets.png')}
                        style={{
                            height: 30,
                            width: 30,
                            margin: 0,
                        }}
                    />
                }
                if (routeName === 'Outputs') {
                    iconName = <Image
                        source={require('../../../img/outputs.png')}
                        style={{
                            height: 20,
                            width: 20,
                            margin: 0,
                        }}
                    />
                }
                if (routeName === 'Inputs') {
                    iconName = <Image
                        source={require('../../../img/inputs.png')}
                        style={{
                            height: 20,
                            width: 20,
                            margin: 0,
                        }}
                    />
                }
                if (routeName === 'Other') {
                    iconName = <Image
                        source={require('../../../img/other.png')}
                        style={{
                            height: 20,
                            width: 20,
                            margin: 0,
                        }}
                    />
                }

                return iconName;
            }
        })
    })

export default createAppContainer(TabNavigator);
