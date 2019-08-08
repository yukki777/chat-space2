class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!
  # 未ログイン時に強制的にログインページに飛ぶ
  # 設定理由: ログインしない限りメインのページを見せないために
  before_action :configure_permitted_parameters, if: :devise_controller?
  
  protected
  # privateのちょっと弱い版　継承先でも使える？

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])

    # サインアップ時に name　を追加することを許可する
    # 設定理由　デフォルトではdeviseはパスワードとメールしか保存できないストロングパラメーターが設定してあるため
  end
end
