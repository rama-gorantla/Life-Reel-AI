import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
// import RNHTMLtoPDF from 'react-native-html-to-pdf';
import * as Print from 'expo-print';

import { Alert } from 'react-native';


interface StoryPopupProps {
    visible: boolean;
    onClose: () => void;
    story: string;
    errorMessage: string;
    loading: boolean;
}

const WORDS_PER_PAGE = 70;

const StoryPopup: React.FC<StoryPopupProps> = ({ visible, onClose, story, errorMessage, loading }) => {
    const [currentPage, setCurrentPage] = React.useState(0);

    const words = story.split(' ');
    const totalPages = Math.ceil(words.length / WORDS_PER_PAGE);

    const getPageText = () => {
        const start = currentPage * WORDS_PER_PAGE;
        const end = start + WORDS_PER_PAGE;
        return words.slice(start, end).join(' ');
    };

    const goToNextPage = () => {
        if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    const handleClose = () => {
        setCurrentPage(0);
        onClose();
    };



    const handleSave = () => {
        // You can implement saving to AsyncStorage or database here
        Alert.alert("Will implement this in next version.");
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
                            <Text style={styles.storyText}>{getPageText()}</Text>
                        )}
                    </View>

                    {!loading && !errorMessage && (
                        <>
                            <Text style={styles.pageIndicator}>Page {currentPage + 1} of {totalPages}</Text>

                            <View style={styles.paginationButtons}>
                                <TouchableOpacity
                                    onPress={goToPreviousPage}
                                    disabled={currentPage === 0}
                                    style={currentPage === 0 ? styles.disabledButton : undefined}
                                >
                                    <Ionicons name="arrow-back-circle" size={32} color="#00f0ff" />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={goToNextPage}
                                    disabled={currentPage === totalPages - 1}
                                    style={currentPage === totalPages - 1 ? styles.disabledButton : undefined}
                                >
                                    <Ionicons name="arrow-forward-circle" size={32} color="#00f0ff" />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.actionButtons}>
                                <TouchableOpacity style={styles.actionBtn} onPress={handleSave}>
                                    <Ionicons name="save-outline" size={24} color="#fff" />
                                    <Text style={styles.buttonText}>Save</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.actionBtn} onPress={handleShare}>
                                    <Ionicons name="share-social-outline" size={24} color="#fff" />
                                    <Text style={styles.buttonText}>Share</Text>
                                </TouchableOpacity>

                            </View>
                        </>
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
        overflow: 'hidden',
    },
    storyText: {
        color: '#fff',
        fontSize: 14,
        lineHeight: 22,
    },

    error: {
        color: '#ff6b6b',
        fontSize: 14,
        textAlign: 'center',
    },
    pageIndicator: {
        color: '#ccc',
        textAlign: 'center',
        marginTop: 10,
    },
    paginationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingHorizontal: 40,
    },
    disabledButton: {
        opacity: 0.4,
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
