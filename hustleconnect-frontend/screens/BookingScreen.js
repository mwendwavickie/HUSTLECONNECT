import React, { useContext, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList,
  TouchableOpacity, Image, Modal, TextInput
} from 'react-native';
import { BookingContext } from '../context/BookingContext';
import { Ionicons, FontAwesome } from '@expo/vector-icons'; // for star icons

const BookingScreen = () => {
  const { bookings, cancelBooking, completeBooking } = useContext(BookingContext);

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [starRating, setStarRating] = useState(0);

  const handleComplete = (bookingId) => {
    completeBooking(bookingId);
    setSelectedBookingId(bookingId);
    setShowReviewModal(true); // show review modal
  };

  const handleSubmitReview = () => {
    console.log("Review Submitted:", {
      bookingId: selectedBookingId,
      reviewText,
      starRating
    });

    // Close modal and reset
    setShowReviewModal(false);
    setReviewText('');
    setStarRating(0);
    setSelectedBookingId(null);
  };

  const renderStars = () => {
    return (
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setStarRating(star)}>
            <FontAwesome
              name={star <= starRating ? 'star' : 'star-o'}
              size={28}
              color="#ff9900"
              style={{ marginHorizontal: 5 }}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderBookings = ({ item }) => (
    <View style={styles.card} key={item._id}>
      <View style={styles.cardContent}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />

        <View style={styles.cardText}>
          <Text style={styles.title}>{item.title}</Text>
          <Text>{item.description}</Text>
          <Text>Price: Ksh {item.price}</Text>
          <Text style={styles.bold}>Date: {item.date}</Text>
          <Text style={styles.bold}>Time: {item.time}</Text>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => cancelBooking(item._id)}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.completeButton}
          onPress={() => handleComplete(item._id)}
        >
          <Text style={styles.buttonText}>Complete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20, marginTop: 50 }}>
      <Text style={styles.header}>My Bookings</Text>

      <FlatList
        data={bookings}
        keyExtractor={(item) => item._id}
        renderItem={renderBookings}
        ListEmptyComponent={<Text style={styles.noResult}>No Bookings Yet</Text>}
      />

      {/* Review Modal */}
      <Modal
        visible={showReviewModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowReviewModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Rate Your Experience</Text>

            {renderStars()}

            <TextInput
              placeholder="Write your review..."
              value={reviewText}
              onChangeText={setReviewText}
              style={styles.reviewInput}
              multiline
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReview}>
              <Text style={styles.buttonText}>Submit Review</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BookingScreen;


const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ff9900',
  },
  cardContent: {
    flexDirection: 'row',
  },
  cardImage: {
    width: 80,
    height: 80,
    marginRight: 15,
    borderRadius: 10,
  },
  cardText: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
  },
  completeButton: {
    backgroundColor: '#ff9900',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  noResult: {
    textAlign: 'center',
    color: '#999',
    marginTop: 50,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    width: '90%',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    width: '100%',
    minHeight: 80,
    textAlignVertical: 'top',
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: '#ff9900',
    marginTop: 15,
    padding: 10,
    width: '100%',
    borderRadius: 6,
  },
  starContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
});
