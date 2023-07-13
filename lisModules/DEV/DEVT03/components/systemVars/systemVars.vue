<template>
    <l-div style="height: 100%">
        <l-card class="bg-grey-2">
            <l-toolbar-title>System Variables</l-toolbar-title>
        </l-card>

        <l-card>
            <l-card-section>
                <div class="text-subtitle2 text-red">
                    Frontend Global Variables
                </div>

                <l-simple-table>
                    <tr class="bg-indigo-2">
                        <th>Key</th>
                        <th>Value</th>
                    </tr>
                    <tr>
                        <td>localstorage.sys_user</td>
                        <td>Username Information</td>
                    </tr>
                    <tr>
                        <td>localstorage.sys_token</td>
                        <td>
                            User authorization token that has been created on
                            login page. Lis checks the token every lis.function
                            process
                        </td>
                    </tr>
                    <tr>
                        <td>localstorage.sys_loginDate</td>
                        <td>User login date-time</td>
                    </tr>
                </l-simple-table>
            </l-card-section>
        </l-card>

        <l-card>
            <l-card-section>
                <div class="text-subtitle2 text-red">
                    Backend Global Variables
                </div>

                <l-simple-table>
                    <tr class="bg-indigo-2">
                        <th>Key</th>
                        <th>Value</th>
                    </tr>
                    <tr>
                        <td>sys_userLicense</td>
                        <td>the user license number for the project</td>
                    </tr>
                    <tr>
                        <td>sys_projectCode</td>
                        <td>The project code</td>
                    </tr>
                    <tr>
                        <td>sys_dbUri</td>
                        <td>It gives the lisdb connection string</td>
                    </tr>

                    <tr>
                        <td>sys_lisServerIp</td>
                        <td>Lis server out IP</td>
                    </tr>
                    <tr>
                        <td>sys_lisApiPort</td>
                        <td>The api port of the project in the server</td>
                    </tr>
                    <tr>
                        <td>sys_lisSocketPort</td>
                        <td>
                            It gives the socket api port of the project in the
                            server (lisMessage and BPM notifications uses this
                            port)
                        </td>
                    </tr>
                    <tr>
                        <td>sys_lisApiOutPort</td>
                        <td>
                            It gives the out api port (Any 3rd part application
                            can use this port)
                        </td>
                    </tr>
                    <tr>
                        <td>sys_currentDate</td>
                        <td>
                            Current date as Date format (*for now
                            2023-07-08T17:22:46.127Z)
                        </td>
                    </tr>
                    <tr>
                        <td>sys_maxDate</td>
                        <td>Minimum date (1970)</td>
                    </tr>
                    <tr>
                        <td>sys_minDate</td>
                        <td>Maximum date (2100)</td>
                    </tr>
                </l-simple-table>
                *All classes are global objects. <br />
                *All Models are global objects. <br />
            </l-card-section>
        </l-card>
    </l-div>
</template>

<script>
export default {};
</script>
