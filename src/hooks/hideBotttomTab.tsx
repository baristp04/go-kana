import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const onHideBottoMTab = (style: string | any) => {

    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            navigation.getParent()?.setOptions({
                ...style,
                tabBarStyle: { display: "none" }
            })
            return () => {
                navigation.getParent()?.setOptions({
                    tabBarStyle: {
                        ...style,
                        display: 'flex'
                    },
                });
            };
        }, [navigation])
    )
}

export default onHideBottoMTab;