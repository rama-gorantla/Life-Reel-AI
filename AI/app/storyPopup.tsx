import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';

interface StoryPopupProps {
    visible: boolean;
    onClose: () => void;
    story: string;
    errorMessage: string;
    loading: boolean;
}

const StoryPopup: React.FC<StoryPopupProps> = ({ visible, onClose, story, errorMessage, loading }) => {
    const handleClose = () => {
        onClose();
    };

    const handleShare = async () => {
        if (!(await Sharing.isAvailableAsync())) {
            alert('Sharing is not available on this device');
            return;
        }

        const fileUri = FileSystem.documentDirectory + 'story.txt';

        await FileSystem.writeAsStringAsync(fileUri, story);
        await Sharing.shareAsync(fileUri);
    };

    return (
        <Modal animationType="slide" transparent={true} visible={visible}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Generated Story</Text>
                        <TouchableOpacity onPress={handleClose}>
                            <Ionicons name="close" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.storyContainer}>
                        {loading ? (
                            <ActivityIndicator size="large" color="#00f0ff" />
                        ) : errorMessage ? (
                            <Text style={styles.error}>{errorMessage}</Text>
                        ) : (
                            <ScrollView>
                                <Text style={styles.storyText}>{story.trim()}</Text>
                            </ScrollView>
                        )}
                    </View>

                    {!loading && !errorMessage && (
                        <View style={styles.actionButtons}>
                            <TouchableOpacity style={styles.actionBtn} onPress={handleShare}>
                                <Ionicons name="share-social-outline" size={24} color="#fff" />
                                <Text style={styles.buttonText}>Share</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '90%',
        backgroundColor: '#2a265f',
        borderRadius: 16,
        padding: 16,
        borderWidth: 2,
        borderColor: '#00f0ff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    storyContainer: {
        backgroundColor: '#3d3d74',
        borderRadius: 14,
        padding: 12,
        height: 300,
        justifyContent: 'flex-start',
    },
    storyText: {
        color: '#fff',
        fontSize: 14,
        lineHeight: 22,
        textAlign: 'justify', // Align text for better readability
    },
    error: {
        color: '#ff6b6b',
        fontSize: 14,
        textAlign: 'center',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#4a4a7d',
    },
    actionBtn: {
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 12,
        marginTop: 4,
    },
});

export default StoryPopup;
