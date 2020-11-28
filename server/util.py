def remap_range(value, left_min, left_max, right_min, right_max):
    # this remaps a value from original (left) range to new (right) range
    # Figure out how 'wide' each range is
    left_span = left_max - left_min
    right_span = right_max - right_min
 
    # Convert the left range into a 0-1 range (int)
    valueScaled = (value - left_min) / left_span
 
    # Convert the 0-1 range into a value in the right range.
    return right_min + (valueScaled * right_span)