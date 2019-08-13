class UsersController < ApplicationController

  def index
    @users = User.where("name LIKE(?)", "%#{params[:keyword]}%")
    
    respond_to do |format|
      # format.html
      format.json
      # binding.pry
    end
  end

  def update
    # 更新　dbへ
    if current_user.update(user_params)
      # params.require(:user).permit(:name, :email)
      redirect_to root_path
      # トップへ戻る
    else
      render :edit
      # editアクションへ
    end
  end

  private
  
  def user_params
    params.require(:user).permit(:name, :email)
    # ログイン中ユーザー情報を含んだuserモデルインスタンスより取得
  end
end
