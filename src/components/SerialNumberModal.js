
import {
    
    Actionsheet,
    ScrollView,
} from 'native-base';
import { TouchableOpacity, Text, View } from 'react-native';

import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';


const SerialNumberModal = ({ isOpen, onPress, onCancel, data }) => {



    return (


        <Actionsheet {...isOpen}>
            <Actionsheet.Content>
                <ScrollView>
                    {data.map(office => (
                        <TouchableOpacity style={{padding:7}}
                        
                            onPress={() => {
                                onPress(office)
                            }}
                            key={office} >
                            <Text  >{office}
                            </Text>

                        </TouchableOpacity>

                    ))}
                </ScrollView>
            </Actionsheet.Content>
        </Actionsheet>

    );
};

export default SerialNumberModal;
