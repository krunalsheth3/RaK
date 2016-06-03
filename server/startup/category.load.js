Meteor.startup(function() {
  if(Category.find().count() === 0) {
    var category = [
      {
        'sex': 'Male',
        'type': 'Sherwani'
      },
      {
        'sex': 'Male',
        'type': 'Indo Western'
      },
      {
        'sex': 'Male',
        'type': 'Jacket Suit'
      },
      {
        'sex': 'Male',
        'type': 'Jacket'
      },
      {
        'sex': 'Male',
        'type': 'Jodhpuri'
      },
      {
        'sex': 'Male',
        'type': 'Kurta Suit'
      },
      {
        'sex': 'Male',
        'type': 'Pathani Suit'
      },
      {
        'sex': 'Male',
        'type': 'Tuxedo'
      },
      {
        'sex': 'Male',
        'type': 'Suit'
      },
      {
        'sex': 'Female',
        'type': 'Saree'
      },
      {
        'sex': 'Female',
        'type': 'Salwar Kameez'
      },
      {
        'sex': 'Female',
        'type': 'Lehenga Choli'
      },
      {
        'sex': 'Female',
        'type': 'Ball Gowns'
      },
      {
        'sex': 'Female',
        'type': 'Short Dress'
      },
      {
        'sex': 'Female',
        'type': 'Strapless Dress'
      },
      {
        'sex': 'Female',
        'type': 'Jewellery'
      },
      {
        'sex': '',
        'type': 'Other'
      }
    ];
    category.forEach(function(category) {
      Category.insert(category);
    });
  }
});