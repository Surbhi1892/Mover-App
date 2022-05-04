
import {
    Actionsheet,
    ScrollView,
} from 'native-base';
import { TouchableOpacity, Text, View } from 'react-native';

import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';


const ActionSheetCom = ({ isOpen, onPress, onCancel, data }) => {



    return (


        <Actionsheet {...isOpen}>
            <Actionsheet.Content>
                <ScrollView>
                    {data.map(office => (
                        <TouchableOpacity style={{padding:7}}
                            onPress={() => {
                                onPress(office.office_name, office.id)
                            }}
                            key={office.office_name} >
                            <Text >{office.office_name}
                            </Text>

                        </TouchableOpacity>

                    ))}
                </ScrollView>
            </Actionsheet.Content>
        </Actionsheet>

    );
};

export default ActionSheetCom;
