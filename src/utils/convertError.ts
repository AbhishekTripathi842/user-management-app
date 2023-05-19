const errors = {
    'email.required': 'Email is required.',
    'email.invalid': 'Email is invalid.',
    'password.required': 'Password is required.',
    'currentPassword.required': 'Current Password is required.',
    'newPassword.required': 'New Password is required.',
    'newPassword.not_same': 'Current And New Password Should Not Be Same.',
    'newPassword.validation_failed':
      'New Password must be at least 6 characters in length, one lowercase/uppercase letter, one digit and a special character(@$.!%*#?&).',
    'confirmPassword.required': 'Confirm Password is required.',
    'confirmPassword.not_matched': 'Confirm Password do not match.',
    'otp.required': 'OTP is required.',
    'firstName.required': 'First name is required.',
    'lastName.required': 'Last name is required.',
    'address.required': 'address is required.',
    'address.validationError':
      'Address length should be more than 5 characters and less than 250 characters',
    'phone.required': 'Phone number is required.',
    'phone.validationError': 'Invalid Phone Number.',
    'otp.expired': 'Otp has been expired.',
    'product.created': 'Product created successfully.',
    'product.updated': 'Product data updated successfully.',
    'product.deleted': 'Product deleted successfully.',
    'product_name.required': 'Product Label Name is required.',
    'product_category_id.required': 'Product Category is required.',
    'food_category_id.required': 'Food Category is required.',
    'product_description.required': 'Product Description is required.',
    'imageFile.required': 'Image is required.',
    'imageFiles.required': 'Images are required.',
    'ingredient.deleted': 'Ingredient deleted successfully.',
    'ingredient.updated': 'Ingredient updated successfully.',
    'ingredient.listed': 'Ingredients display successfully.',
    'ingredient.added': 'Ingredients added successfully.',
    'ingredient.alreadyIncluded': 'Ingredient already exist in list.',
    'ingredient.selectedFailed': `Please select atleast one ingredient.`,
    'manualIngredient.required': 'Manual Ingredient is required.',
    'manualIngredientTags.required': 'Manual ingredient tag is required.',
    'manualIngredientTags.same': 'Please update ingredient tag.',
    'imageUpload.limit10': 'You cannot upload more than 10 images',
    'imageUpload.exceedSizeLimit': 'Image exceed size limit',
    'imageUpload.exceedSizeLimit20mb':
      'Image must not exceed size limit of more than 20MB',
    'documentUpload.exceedSizeLimit10mb':
      'Document must not exceed size limit of more than 10MB',
    'uploadFile.limit.files10.size20mb':
      'Up to 10 files are allowed to be uploaded with a maximum size of 20 MB per file. Extensions allowed are .png, .jpeg and .webp.',
    'profileImage.requirement':
      'The maximum upload size is 20MB. Extensions allowed are .png, .jpeg and .webp.',
    'ingredient.splitInfo': `You can add ingredients by pressing ' , ' or 'ENTER' key`,
    'ingredient.required': `Ingredient is required`,
    'ingredient.alreadyExist': `Ingredient already Exist`,
    'ingredient.exist.autoRemove': `Ingredient removed because it is already exist`,
    'ingredient.exist.previousList': `Ingredient already added in list`,
    'emailTags.splitInfo': `You can add multiple emails by pressing ' , ' or 'ENTER' key`,
    'tag.splitInfo': `You can add multiple tags by pressing ' , ' or 'ENTER' key`,
    'tag.required': `Tag is required`,
    'tag.alreadyExist': `Tag already Exist`,
    'tag.exist.autoRemove': `Tag removed because it is already exist`,
    'tag.exist.previousList': `Tag already added in list`,
    'email.alreadyExist': `Email already Exist`,
    'email.exist.autoRemove': `Email removed because it is already exist`,
    'email.exist.previousList': `Email already added in list`,
    'emailTag.selfEmail': `You cannot share product with yourself`,
    'change.uploadImage': `Please update Image.`,
    'ocr.failed': `Failed to detect text from image.`,
    'session.expired': `Your session has expired. Please login again.`,
    'product.invalidId': `Product 11 does not exist.`,
    'plantReplacementId.invalidId': `Replacement does not exist.`,
    'product.productReplacementAdditiveId': `Product Replacement does not exist.`,
    'comment.required': 'Comment is required.',
    'comment.length': 'Comment cannot be less than 100 characters.',
    'Invalid Product Id': 'Product does not exist.',
    'permission.denied': `You don't have permission.`,
  };
  
  export const convertError = (value: string) => {
    if (errors.hasOwnProperty(value)) {
      // tslint:disable-next-line:no-any
      return (errors as any)[value];
    }
    return value;
  };
  