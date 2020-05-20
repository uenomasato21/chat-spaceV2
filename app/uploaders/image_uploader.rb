class ImageUploader < CarrierWave::Uploader::Base
  # Include RMagick or MiniMagick support:
  # include CarrierWave::RMagick
  include CarrierWave::MiniMagick
  # storage :fog
# 〜省略〜
  process resize_to_fit: [800, 800]
# 〜省略〜
end